import { useState } from "react";
import Input from "../components/common/Input";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import Select from "../components/common/Select";
import Modal from "../components/common/Modal";
import Table from "../components/common/Table";
import Textarea from "../components/common/Textarea";
import Link from "../components/common/Link";
import Image from "../components/common/Image";
import TextEditor from "../components/common/TextEditor";
import ThumbnailSlider from "../components/users/ThumbnailSlider";

const ComponentTest = () => {
    // let [state, setState] = useState("");
    // let [isShow, setIsShow] = useState(false);

    // const handleChangeState = (e) => {
    //     setState(e.target.value);
    // };
    return (
        // <div className="">
        //     <TextEditor editorState={state} setEditorState={setState} />
        //     <Image src="https://pbs.twimg.com/media/FB5J6usWEAEsV_6.jpg" style="w-48 h-48" />
        //     <Link link="/admin">Hello</Link>
        //     <Textarea
        //         value={state}
        //         onchange={handleChangeState}
        //         placeholder={"input here"}
        //         required
        //         label={"Textarea"}
        //     />
        //     <Input
        //         name={"test"}
        //         required={true}
        //         label="Test"
        //         id="test"
        //         value={state}
        //         onChange={handleChangeState}
        //         icon={faMailBulk}
        //         // error={"Hello"}
        //     />

        //     <Button title={"New"} variant={"success"} />
        //     <Button title={"New"} variant={"info"} />
        //     <Button title={"New"} variant={"error"} />
        //     <Button title={"New"} variant={"primary"} />
        //     <Button title={"New"} variant={"secondary"} />
        //     <div className="relative h-48 w-48">
        //         <Loader isShow={true} />
        //     </div>
        //     <Select
        //         id={"select"}
        //         name={"select"}
        //         label={"Here is select"}
        //         titles={["title 1", "title 2", "title 3"]}
        //         values={["value 1", "value 2", "value 3"]}
        //         required={true}
        //     />

        //     <Button title="Toggle Modal" variant="primary" onclick={() => setIsShow(true)} />
        //     <Modal
        //         isShow={isShow}
        //         close={() => setIsShow(false)}
        //         title="Modal"
        //         style="min-h-screen"
        //     >
        //         <Button title={"New"} variant={"success"} />
        //         <Button title={"New"} variant={"info"} />
        //         <Button title={"New"} variant={"error"} />
        //     </Modal>
        //     <Table
        //         headers={["Modal", "Modal", "Modal", "Modal", "Modal"]}
        //         data={[
        //             {
        //                 a: "Modal",
        //                 b: "Modal",
        //                 c: "Modal",
        //                 d: "Modal",
        //                 e: (
        //                     <div className="flex gap-3">
        //                         <Button title="Button" variant={"success"} />
        //                         <Button title="Button" variant={"primary"} />
        //                     </div>
        //                 ),
        //             },
        //             {
        //                 a: "Modal",
        //                 b: "Modal",
        //                 c: "Modal",
        //                 d: "Modal",
        //                 e: (
        //                     <div className="flex gap-3">
        //                         <Button title="Button" variant={"success"} />
        //                         <Button title="Button" variant={"primary"} />
        //                     </div>
        //                 ),
        //             },
        //             {
        //                 a: "Modal",
        //                 b: "Modal",
        //                 c: "Modal",
        //                 d: "Modal",
        //                 e: (
        //                     <div className="flex gap-3">
        //                         <Button title="Button" variant={"success"} />
        //                         <Button title="Button" variant={"primary"} />
        //                     </div>
        //                 ),
        //             },
        //             {
        //                 a: "Modal",
        //                 b: "Modal",
        //                 c: "Modal",
        //                 d: "Modal",
        //                 e: (
        //                     <div className="flex gap-3">
        //                         <Button title="Button" variant={"success"} />
        //                         <Button title="Button" variant={"primary"} />
        //                     </div>
        //                 ),
        //             },
        //             {
        //                 a: "Modal",
        //                 b: "Modal",
        //                 c: "Modal",
        //                 d: "Modal",
        //                 e: (
        //                     <div className="flex gap-3">
        //                         <Button title="Button" variant={"success"} />
        //                         <Button title="Button" variant={"primary"} />
        //                     </div>
        //                 ),
        //             },
        //         ]}
        //     />
        // </div>
        <ThumbnailSlider
            images={[{ link: "icon.png" }, { link: "product.jpg" }, { link: "user.png" }]}
        />
    );
};

export default ComponentTest;
