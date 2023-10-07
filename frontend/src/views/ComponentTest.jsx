import { useState } from "react";
import Input from "../components/common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

const ComponentTest = () => {
    let [state, setState] = useState("");

    const handleChangeState = (e) => {
        setState(e.target.value);
    };

    return (
        <div className="flex flex-col gap-5 w-11/12 min-h-screen bg-slate-200 border rounded-md mx-auto p-5 items-center">
            <Input
                name={"test"}
                required={true}
                label="Test"
                id="test"
                value={state}
                onChange={handleChangeState}
                icon={<FontAwesomeIcon icon={faMailBulk} />}
                // error={"Hello"}
            />
        </div>
    );
};

export default ComponentTest;
