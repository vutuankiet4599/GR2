import parser from "html-react-parser";

const HtmlUtils = {
    parser: (text) => {
        return parser(text);
    },
};

export default HtmlUtils;
