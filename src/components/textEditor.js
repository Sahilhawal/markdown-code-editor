import {
  EditorState,
  Modifier,
  Editor,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import "draft-js/dist/Draft.css";
import { useState, useEffect } from "react";
import { PREFIX_VALUES, STYLE_SETTINGS, styleMap } from "../constants";

const editorContainerStyle = {
  backgroundColor: "black",
  color: "white",
  borderRadius: "4px",
  padding: "12px",
  marginBottom: "16px",
  width: "80%",
  height: "80%",
};

const buttonStyle = {
  backgroundColor: "#4338ca",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  outline: "none",
  boxShadow: "none",
  cursor: "pointer",
};

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const savedEditorStateJSON = localStorage.getItem("savedEditorState");
    if (savedEditorStateJSON) {
      const savedEditorState = JSON.parse(savedEditorStateJSON);
      setEditorState(
        EditorState.createWithContent(convertFromRaw(savedEditorState))
      );
    }
  }, []);

  const handleBlockTypeChanges = (
    editorState,
    contentState,
    selectionState,
    styleSetting,
    prefix
  ) => {
    const newContentState = Modifier.setBlockType(
      contentState,
      selectionState,
      styleSetting.value
    );

    const newContentStateWithoutHash = Modifier.replaceText(
      newContentState,
      selectionState.merge({
        anchorOffset: 0,
        focusOffset: prefix.length,
      }),
      ""
    );

    setEditorState(
      EditorState.push(
        editorState,
        newContentStateWithoutHash,
        "change-block-type"
      )
    );

    return;
  };

  const handleInlineStyleChanges = (
    editorState,
    contentState,
    selectionState,
    styleSetting,
    prefix
  ) => {
    contentState = Modifier.setBlockType(
      contentState,
      selectionState,
      "unstyled"
    );

    const newEditorStateWithBold1 = EditorState.push(
      editorState,
      contentState,
      "change-block-type"
    );

    setEditorState(newEditorStateWithBold1);

    const contentStateWithoutPrefix = Modifier.replaceText(
      contentState,
      selectionState.merge({
        anchorOffset: 0,
        focusOffset: prefix.length,
      }),
      " "
    );

    const contentStateWithInlineStyle = Modifier.applyInlineStyle(
      contentStateWithoutPrefix,
      selectionState.merge({ anchorOffset: 0, focusOffset: 1 }),
      styleSetting.value
    );

    const newEditorStateWithBold = EditorState.push(
      editorState,
      contentStateWithInlineStyle,
      "change-inline-style"
    );

    setEditorState(newEditorStateWithBold);
    return;
  };

  const handleEditorChange = (editorState) => {
    let contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const currentBlock = contentState.getBlockForKey(
      selectionState.getStartKey()
    );
    const currentText = currentBlock.getText();

    if (PREFIX_VALUES.includes(currentText)) {
      const styleSetting = STYLE_SETTINGS[currentText];
      if (styleSetting.type === "BLOCK") {
        handleBlockTypeChanges(
          editorState,
          contentState,
          selectionState,
          styleSetting,
          currentText
        );
      } else if (styleSetting.type === "INLINE_STYLE") {
        handleInlineStyleChanges(
          editorState,
          contentState,
          selectionState,
          styleSetting,
          currentText
        );
      }
    } else {
      setEditorState(editorState);
    }
  };

  const handleSaveClick = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateRaw = convertToRaw(contentState);
    localStorage.setItem("savedEditorState", JSON.stringify(contentStateRaw));
    alert("Editor state saved!");
  };

  return (
    <>
      <div style={editorContainerStyle}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          customStyleMap={styleMap}
        />
      </div>
      <button style={buttonStyle} onClick={handleSaveClick}>
        Save
      </button>
    </>
  );
}
