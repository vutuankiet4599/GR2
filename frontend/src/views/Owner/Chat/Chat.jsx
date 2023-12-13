import authAPI from "../../../api/authAPI";
import { toast } from "react-toastify";
import Input from "../../../components/common/Input";
import Image from "../../../components/common/Image";
import Textarea from "../../../components/common/Textarea";
import Button from "../../../components/common/Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../../context/AppContext";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import SessionUtils from "../../../utils/SessonUtils";

window.Pusher = Pusher;

window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_BACKEND_URL}/broadcasting/auth`,
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_KEY,
    cluster: "ap1",
    forceTLS: true,
    auth: {
        headers: {
            Authorization: "Bearer " + SessionUtils.get("api-token"),
        },
    },
});

const handleGetAllUsersToChat = async (setUsers) => {
    try {
        let response = await authAPI.get(`/chat/users`);
        setUsers(response.data);
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};

const handleGetAllMessagesOfTwoUsers = async (user1, user2, setMessages) => {
    try {
        let response = await authAPI.get(`/chat/${user1}/${user2}`);

        setMessages(
            response.data.map((message) => ({
                from: { id: message.from },
                to: { id: message.to },
                message: message.message,
            })),
        );
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};

const Chat = () => {
    const { data } = useContext(AppContext);
    const [selectedUser, setSelectedUser] = useState(-1);
    const [selectedUserId, setSelectedUserId] = useState(-1);
    const [users, setUsers] = useState([]);
    const [userFilter, setUserFilter] = useState("");
    const filteredUsers = users?.filter((user) =>
        user.name.toLowerCase().includes(userFilter.toLowerCase()),
    );
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const messageRef = useRef(null);

    const handleSendMessage = async () => {
        try {
            let messageData = {
                message: message,
                from: { id: data.user.id, name: data.user.name, avatar: data.user.avatar },
                to: {
                    id: users[selectedUser].id,
                    name: users[selectedUser].name,
                    avatar: users[selectedUser].avatar,
                },
            };

            let newMessages = [...messages];
            newMessages.push(messageData);
            setMessages(newMessages);

            await authAPI.post("/chat", {
                message: message,
                to: users[selectedUser].id,
            });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        handleGetAllUsersToChat(setUsers);
    }, []);

    useEffect(() => {
        if (selectedUser != -1) {
            window.Echo.private(`chat.${users[selectedUser].id}.${data.user.id}`).listen(
                "MessageChatEvent",
                (e) => {
                    let messageData = {
                        message: e.message,
                        from: {
                            id: e.fromUser.id,
                            name: e.fromUser.name,
                            avatar: e.fromUser.avatar,
                        },
                        to: {
                            id: e.toUser.id,
                            name: e.toUser.name,
                            avatar: e.toUser.avatar,
                        },
                    };
                    setMessages((prevMessages) => [...prevMessages, messageData]);
                },
            );
        }

        return () => {
            if (selectedUser != -1) {
                window.Echo.private(`chat.${users[selectedUser].id}.${data.user.id}`).stopListening(
                    "MessageChatEvent",
                );
            }
        };
    }, [selectedUser, data.user.id, users]);

    useEffect(() => {
        if (selectedUserId != -1 && data.user.id) {
            handleGetAllMessagesOfTwoUsers(data.user.id, selectedUserId, setMessages);
        }
    }, [data.user.id, selectedUserId]);

    return (
        <div className="flex h-screen w-full items-center justify-center px-12 py-8">
            <div className="flex h-full w-1/4 flex-col items-center justify-start gap-0 overflow-auto border">
                <div className="h-fit w-full border-b bg-white px-8 py-6">
                    <Input
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                        icon={faSearch}
                    />
                </div>
                <div className="flex h-full w-full flex-col overflow-auto">
                    {filteredUsers.map((item, index) => (
                        <div
                            key={index}
                            className={`flex h-fit w-full cursor-pointer gap-3 border-b px-6 py-4 hover:bg-slate-50 ${
                                index == selectedUser && "bg-slate-100"
                            }`}
                            onClick={() => {
                                setSelectedUser(index);
                                setSelectedUserId(item.id);
                            }}
                        >
                            <Image
                                src={item.avatar ? item.avatar : "/user.png"}
                                style={"w-16 h-16 rounded-full"}
                            />
                            <p className="text-xl font-bold">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex h-full w-3/4 flex-col items-center justify-start gap-0 border border-l-0">
                <div
                    className="flex w-full grow flex-col items-end gap-5 overflow-auto border-b px-4 py-3"
                    ref={messageRef}
                >
                    {messages.map((message, index) => {
                        if (message.from.id != data.user.id) {
                            return (
                                <div
                                    key={index}
                                    className="flex w-full items-start justify-start gap-1"
                                >
                                    <Image
                                        src={
                                            users[selectedUser].avatar
                                                ? users[selectedUser].avatar
                                                : "/user.png"
                                        }
                                        style={"w-10 h-10 rounded-full"}
                                    />
                                    <div className="flex max-w-[66%] flex-col text-base">
                                        <p className="text-sm font-bold">
                                            {users[selectedUser].name}
                                        </p>
                                        <div className="break-words rounded-md bg-white">
                                            {message.message}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={index} className="flex items-start justify-end gap-1">
                                <div className="flex max-w-[66%] flex-col text-base">
                                    <p className="text-sm font-bold">{data.user.name}</p>
                                    <div className="break-words rounded-md bg-white">
                                        {message.message}
                                    </div>
                                </div>
                                <Image
                                    src={data.user.avatar ? data.user.avatar : "/user.png"}
                                    style={"w-10 h-10 rounded-full"}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="flex h-20 w-full items-center justify-center">
                    <Textarea
                        value={message}
                        onchange={(e) => setMessage(e.target.value)}
                        cols={1}
                        style={"h-full"}
                        containerStyle={"h-full rounded-none"}
                    />
                    <Button
                        variant={"user"}
                        title="Send"
                        style={"h-full w-20"}
                        onclick={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    );
};

Chat.propTypes = {};

export default Chat;
