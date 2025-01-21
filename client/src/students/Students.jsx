import { Col, Row, Space, Input, Spin } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchStudentQuery } from '../store/students/studentApiSlice';

// Utility function to highlight matched text
const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) =>
        regex.test(part) ? <span key={index} style={{ backgroundColor: '#ff0' }}>{part}</span> : part
    );
};

const Students = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const { data: studentData, isLoading } = useSearchStudentQuery(
        { search: searchTerm },
        { skip: searchTerm.length < 3 }
    );

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedSearch = useCallback(
        debounce((value) => {
            setSearchTerm(value);
        }, 300),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        debouncedSearch(value);
        setIsDropdownVisible(value.length >= 3);
    };

    const handleFocus = () => {
        if (searchTerm.length >= 3 && studentData && studentData.data.length > 0) {
            setIsDropdownVisible(true);
        }
    };

    useEffect(() => {
        if (studentData && studentData.data.length > 0) {
            setIsDropdownVisible(true);
        } else {
            setIsDropdownVisible(false);
        }
    }, [studentData]);

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        setIsDropdownVisible(false);
    };

    return (
        <Space direction="vertical" style={{ display: "flex", padding: '20px' }}>
            <Col span={24}>
                <Row>
                    <Col>
                        <Input
                            placeholder="Search students"
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            allowClear
                            autoFocus
                        // value={searchTerm}
                        />
                        {isDropdownVisible && !isLoading && (
                            <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', marginTop: '4px', maxHeight: '200px', overflowY: 'auto' }}>
                                {studentData?.data?.map((student) => (
                                    <div
                                        key={student.rollNumber}
                                        onClick={() => handleStudentSelect(student)}
                                        style={{ padding: '8px', cursor: 'pointer' }}
                                    >
                                        {highlightMatch(student.name, searchTerm)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Col>
                </Row>
                {isLoading && <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />}
                <Row>
                    <Col span={12} style={{ marginTop: '20px' }}>
                        {selectedStudent ? (
                            <div>
                                <p><strong>Name:</strong> {selectedStudent.name}</p>
                                <p><strong>Class:</strong> {selectedStudent.class}</p>
                                <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                            </div>
                        ) : (
                            <p>Select a student to view details.</p>
                        )}
                    </Col>
                </Row>
            </Col>
        </Space>
    );
};

export default Students;
