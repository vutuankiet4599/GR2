import PropTypes from "prop-types";
import { useCallback, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageService from "../../services/ImageService";

const TextEditor = ({ label, editorState, setEditorState, folder = "admin" }) => {
    const ref = useRef(null);
    const handleUploadImage = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const response = await ImageService.insertImage(file, folder);
                const url = response.data.link;
                const quill = ref.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, "image", url);
                }
            }
        };
    }, [folder]);
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                    ["link", "image", "video"],
                    ["code-block"],
                    ["clean"],
                ],
                handlers: { image: handleUploadImage },
            },
        }),
        [handleUploadImage],
    );

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "code-block",
    ];

    return (
        <div className="mb-12 h-48 w-full">
            {label && <p className="text-xl font-medium">{label}</p>}
            <ReactQuill
                ref={ref}
                theme="snow"
                value={editorState}
                onChange={setEditorState}
                modules={modules}
                formats={formats}
                className="h-full"
            />
        </div>
    );
};

TextEditor.propTypes = {
    label: PropTypes.string,
    editorState: PropTypes.any.isRequired,
    setEditorState: PropTypes.func.isRequired,
    folder: PropTypes.string,
};

export default TextEditor;
