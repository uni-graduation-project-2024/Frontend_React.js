// // commChat.js
// import "./commChat.css";
// import { useEffect, useRef, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import { getAuthToken } from '../../services/auth';



// export default function CommChat() {
//     const [connection, setConnection] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [content, setContent] = useState("");
//     const messagesEndRef = useRef(null);
//     const [senderId, setSenderId] = useState(null);
//     const { user, token } = getAuthToken();
//     const [receiverId, setReceiverId] = useState(""); // receiverId as string

//     useEffect(() => {
//         if (!token) return;
//         // Example: set receiverId to a string value (replace with actual logic)
//         setReceiverId("1");
//         setSenderId("2");



//         console.log("TOKEN: ", token);
//         console.log("Sender ID: ", senderId);
//         console.log("Receiver ID: ", receiverId);


//         const connect = new signalR.HubConnectionBuilder()
//             .withUrl("https://localhost:7078/ChatHub", {
//                 accessTokenFactory: () => token
//             })
//             .configureLogging(signalR.LogLevel.Information)
//             .build();

//         connect.on("ReceiveMessage", (message) => {
//             setMessages(prev => [...prev, message]);
//         });

//         connect.start()
//             .then(() => {
//                 const payload = JSON.parse(atob(token.split('.')[1]));
//                 const id = payload.nameid || payload.sub;
//                 setSenderId(id);
//                 console.log("Connected to ChatHub");
//             })
//             .catch(err => {
//                 console.error("SignalR Connection Failed", err);
//             });

//         setConnection(connect);

//         return () => {
//             connect.stop();
//         }
//     }, [token]);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const handleSend = async () => {
//         if (!content.trim()) return;
//         try {
//             const res = await fetch("https://localhost:7078/api/Chat/send", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                     senderId,
//                     receiverId,
//                     content
//                 })
//             });

//             if (!res.ok) {
//                 const errorText = await res.text();
//                 console.error("Failed to send message:", res.status, errorText);
//                 return;
//             }

//             setContent("");
//         } catch (err) {
//             console.error("Fetch error:", err);
//         }
//     };

//     return (
//         <div className="chat-container">
//             <div className="chat-box">
//                 {messages.map((msg, i) => (
//                     <div key={i} className={`message ${msg.senderId === senderId ? "sent" : "received"}`}>
//                         <strong>{msg.senderId === senderId ? "You" : "Them"}:</strong> {msg.content}
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <div className="chat-input">
//                 <input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                 />
//                 <button onClick={handleSend}>Send</button>
//             </div>
//         </div>
//     );
// }

// CommChat.js
// import "./commChat.css";
// import { useEffect, useRef, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import { getAuthToken } from '../../services/auth';

// export default function CommChat() {
//     const [connection, setConnection] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [content, setContent] = useState("");
//     const messagesEndRef = useRef(null);
//     const [receiverId, setReceiverId] = useState("");
//     const { token } = getAuthToken();

//     const [senderId, setSenderId] = useState(null);

//     useEffect(() => {
//         if (!token) return;

//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const currentUserId = payload.nameid || payload.sub;
//         setSenderId(currentUserId);

//         // Optional: Set receiverId based on selected chat or default for testing
//         // Here assuming a temporary fixed receiver just for demonstration
//         setReceiverId("some-other-user-id");

//         const connect = new signalR.HubConnectionBuilder()
//             .withUrl("https://localhost:7078/ChatHub", {
//                 accessTokenFactory: () => token
//             })
//             .configureLogging(signalR.LogLevel.Information)
//             .build();

//         connect.on("ReceiveMessage", (message) => {
//             setMessages(prev => [...prev, message]);
//         });

//         connect.start()
//             .then(() => {
//                 console.log("Connected to ChatHub");
//             })
//             .catch(err => {
//                 console.error("SignalR Connection Failed", err);
//             });

//         setConnection(connect);

//         return () => {
//             connect.stop();
//         }
//     }, [token]);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const handleSend = async () => {
//         if (!content.trim() || !senderId || !receiverId) return;

//         try {
//             const res = await fetch("https://localhost:7078/api/Chat/send", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ senderId, receiverId, content })
//             });

//             if (!res.ok) {
//                 const errorText = await res.text();
//                 console.error("Failed to send message:", res.status, errorText);
//                 return;
//             }

//             setContent("");
//         } catch (err) {
//             console.error("Fetch error:", err);
//         }
//     };

//     return (
//         <div className="chat-container">
//             <div className="chat-box">
//                 {messages.map((msg, i) => (
//                     <div key={i} className={`message ${msg.senderId === senderId ? "sent" : "received"}`}>
//                         <strong>{msg.senderId === senderId ? "You" : "Them"}:</strong> {msg.content}
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <div className="chat-input">
//                 <input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                 />
//                 <button onClick={handleSend}>Send</button>
//             </div>
//         </div>
//     );
// }


import "./commChat.css";
import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { getAuthToken } from '../../services/auth';

export default function CommChat() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const messagesEndRef = useRef(null);
    const { token, user } = getAuthToken();
    const [senderId, setSenderId] = useState(null);
    const [receiverId, setReceiverId] = useState("");

    useEffect(() => {
        if (!token) return;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentUserId = payload.nameid || payload.sub;
        setSenderId(currentUserId);

        // Simulate selecting a chat receiver (you can later replace this with actual UI logic)
        // For example, receiver is "user2" if I'm "user1"
        const simulatedReceiverId = currentUserId === "user1" ? "user2" : "user1";
        setReceiverId(simulatedReceiverId);

        const connect = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7078/ChatHub", {
                accessTokenFactory: () => token
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connect.on("ReceiveMessage", (message) => {
            setMessages(prev => [...prev, message]);
        });

        connect.start()
            .then(() => {
                console.log("✅ Connected to ChatHub");
            })
            .catch(err => {
                console.error("❌ SignalR Connection Failed", err);
            });

        setConnection(connect);

        return () => {
            connect.stop();
        };
    }, [token]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!content.trim() || !senderId || !receiverId) return;

        try {
            const res = await fetch("https://localhost:7078/api/Chat/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ senderId, receiverId, content })
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("❌ Failed to send message:", res.status, errorText);
                return;
            }

            setContent("");
        } catch (err) {
            console.error("❌ Fetch error:", err);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages
                    .filter(msg =>
                        (msg.senderId === senderId && msg.receiverId === receiverId) ||
                        (msg.senderId === receiverId && msg.receiverId === senderId)
                    )
                    .map((msg, i) => (
                        <div key={i} className={`message ${msg.senderId === senderId ? "sent" : "received"}`}>
                            <strong>{msg.senderId === senderId ? "You" : "Them"}:</strong> {msg.content}
                        </div>
                    ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

