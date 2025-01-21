import { Input, Spin } from 'antd';
import React, { useState, useCallback, Suspense } from 'react';
import { useSearchStudentQuery } from '../store/students/studentApiSlice';
import SearchBar from '../components/searchBar/index';
import DropdownList from '../components/DropdownList/index';
const StudentCard = React.lazy(() => import('../components/StudentCard'));

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

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        setIsDropdownVisible(false);
    };

    return (
        <div className="container">
            <h1>Search Students</h1>
            <SearchBar handleSearchChange={handleSearchChange} handleFocus={handleFocus} />
            {isDropdownVisible && !isLoading && (
                <div className="drop-down">
                    <DropdownList studentData={studentData} handleStudentSelect={handleStudentSelect} searchTerm={searchTerm} />
                </div>)}
            {isLoading && <Spin size="large" />}
            {selectedStudent ? (
                <div>
                    <Suspense fallback={<Spin size="large" />}>

                        <StudentCard selectedStudent={selectedStudent} />
                    </Suspense>

                </div>
            ) : (
                < p > Search And Select A Student To View Detail</ p>
            )
            }
        </div >
    );
};

export default Students;
