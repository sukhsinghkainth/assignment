import React from 'react'

function StudentCard({ selectedStudent }) {
    return (
        <div>
            <div className="card">
                <div className="header">Student Information</div>
                <div className='info-container'>
                    <div className="info">
                        <span><strong>Name: </strong></span>
                        <span className="highlight">{selectedStudent.name}
                        </span>
                    </div>
                    <div className="info">
                        <span><strong>Class: </strong></span><span className="highlight">{selectedStudent.class}</span>
                    </div>
                    <div className="info">
                        <span><strong>Roll Number: </strong></span><span className="highlight">{selectedStudent.rollNumber}</span>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default StudentCard