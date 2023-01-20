import React, { useState } from "react"

const ModernModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <button
                className="bg-blue-500 text-black p-2 rounded-lg"
                onClick={() => setIsOpen(true)}
            >
                Open Modal
            </button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center p-6">
                    <div className="bg-white rounded-lg p-6">
                        <p>Modal content goes here</p>
                        <button
                            className="bg-red-500 text-white p-2 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModernModal
