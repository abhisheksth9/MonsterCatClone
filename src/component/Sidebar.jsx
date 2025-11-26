import React, { useState } from "react";
import { icons } from "./Data";
import "../style/Sidebar.css";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-header">
                {isOpen ? (
                    <>
                        <img src="/logo/Monstercattext.png" alt="monstercat" className="logo" />
                        <img
                            src="/logo/close.png"
                            alt="Close"
                            className="close-icon"
                            onClick={() => setIsOpen(false)}
                        />
                    </>
                ) : (
                    <img
                        src="/logo/MenuBar.png"
                        alt="Open"
                        className="menu-icon"
                        onClick={() => setIsOpen(true)}
                    />
                )}
            </div>

            {isOpen && (
                <div className="details-scroll">
                    <p>MUSIC &rsaquo;</p>
                    <p>ARTIST</p>
                    <p>ABOUT &rsaquo;</p>
                    <p>NEWS</p>
                    <p>EVENTS &rsaquo;</p>
                    <p>PROGRAMMING &rsaquo;</p>
                    <p>GOLD</p>
                    <p>PARTNERS</p>
                    <p>PRESS</p>
                    <p>PLAYER</p>
                    <p>SHOP</p>
                    <p>LOST CIVILIZATION</p>
                </div>
            )}

            <div className="icon-section">
                <ul className={isOpen ? "icon-row" : "icon-column"}>
                    {icons.map(({ id, icon, name }) => (
                        <li key={id}>
                            <img src={icon} alt={name} className="sidebar-icon" />
                            {isOpen && <span className="icon-label">{name}</span>}
                        </li>
                    ))}
                </ul>
            </div>

            {isOpen && (
                <div className="auth-buttons">
                    <button className="sign-in">SIGN IN</button>
                    <p className="or">OR</p>
                    <button className="sign-up">SIGN UP</button>
                </div>
            )}
        </div>
    );
}

export default Sidebar;