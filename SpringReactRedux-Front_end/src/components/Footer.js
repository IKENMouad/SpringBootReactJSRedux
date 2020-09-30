import React from 'react'

export default function Footer () {
    let fullDate = new Date().getFullYear();
    return (
        <div className="bg-dark nav justify-content-center fixed-bottom">
            <div className="text-white">
                @ Copy Right {fullDate} / {fullDate + 1}
                <br />
                <span>cretead By IKEN Mouad</span>
            </div>
        </div>
    )
}
