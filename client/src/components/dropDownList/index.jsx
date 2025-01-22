
import React from 'react'

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
};

const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    const escaped = escapeRegExp(searchTerm)
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.split(regex).map((part, index) =>
        regex.test(part) ? <span key={index} style={{ backgroundColor: '#ff0' }}>{part}</span> : part
    );
};
function DropDown({ studentData, handleStudentSelect, searchTerm }) {
    return (
        <div className="drop-down">
            {studentData?.data?.length > 0 ? (
                studentData.data.map((student) => (
                    <div
                        key={student.rollNumber}
                        onClick={() => handleStudentSelect(student)}
                        className='student-list'
                    >
                        {highlightMatch(student.name, searchTerm)}
                    </div>
                ))
            ) : (
                <div style={{ padding: '8px' }}>No data found</div>
            )}
        </div>
    )
}

export default DropDown


