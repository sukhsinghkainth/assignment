import { Spin } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import { useSearchStudentQuery, useLazyGetStudentQuery } from '../store/students/studentApiSlice';
import SearchBar from '../components/searchBar/index';
import DropdownList from '../components/DropdownList/index';
import StudentCard from '../components/StudentCard';
import Debounce from '../utils/Debounce';

const limit = 5
const offset = 1

const Students = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [searchError, setSearchError] = useState('')
    const [trigger] = useLazyGetStudentQuery()

    const { data: studentData, isLoading, isError, error } = useSearchStudentQuery(
        { search: searchTerm, limit, offset },
        { skip: searchTerm.length < 3 },

    );

    const debouncedSearch = useCallback(
        Debounce((value) => {
            const pattern = /^[a-zA-Z\s]*$/;
            if (pattern.test(value)) {
                setSearchError('')
                setSearchTerm(value);
            }
            else {
                setSearchError("Only alphabetic characters are allowed");
            }
        }, 500),
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

    const handleStudentSelect = async (student) => {
        try {
            const result = await trigger({ rollNumber: student.rollNumber }).unwrap()
            setSelectedStudent(result?.data);
        } catch (error) {
            console.log('error while fetching', error)
        }
        setIsDropdownVisible(false);
    };
    return (
        <div className="container">
            <h1>Search Students</h1>
            <SearchBar handleSearchChange={handleSearchChange} handleFocus={handleFocus} />
            <span style={{ color: 'red', marginTop: "5px" }}>
                {error?.data?.message}
                {searchError ? searchError : null}
            </span>
            {isDropdownVisible && !isLoading && !isError && (
                <div className="drop-down">
                    <DropdownList studentData={studentData} handleStudentSelect={handleStudentSelect} searchTerm={searchTerm} />
                </div>)}
            {isLoading && <Spin size="large" />}
            {selectedStudent ? (
                <div>
                    <StudentCard selectedStudent={selectedStudent} />
                </div>
            ) : (
                < p > Search And Select A Student To View Detail</ p>
            )
            }
        </div >
    );
};

export default Students;
