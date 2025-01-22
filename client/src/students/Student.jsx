import { Spin } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import { useSearchStudentQuery, useLazyGetStudentQuery } from '../store/students/studentApiSlice';
import StudentCard from '../components/StudentCard';
import Debounce from '../utils/Debounce';
import CustomSelect from '../components/select';
import { useForm } from 'react-hook-form';

const limit = 5
const offset = 1

const Students = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const { control } = useForm()
    const [searchTerm, setSearchTerm] = useState("")
    const [trigger] = useLazyGetStudentQuery()
    const [searchError, setSearchError] = useState('')
    const { data: studentData, isLoading, error, isSuccess } = useSearchStudentQuery(
        { search: searchTerm, limit, offset },
        { skip: searchTerm?.length < 3 },
    );
    const [studentList, setStudentList] = useState([])


    const highlightText = (text, search) => {
        if (!search) return text;
        const regex = new RegExp(`(${search})`, "gi");
        const parts = text.split(regex);
        const data = parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: "#ffcc00", fontWeight: "bold" }}>
                    {part}
                </span>
            ) : (
                part
            )
        );
        return data
    };

    useEffect(() => {
        if (isSuccess) {
            if (searchTerm?.length < 3) {
                setStudentList([])
            } else if (searchTerm) {
                setStudentList(studentData?.data.map((data) => ({ label: highlightText(data.name, searchTerm), value: data.rollNumber, key: data.name })))
            }
        }
    }, [searchTerm, studentData])

    const debouncedSearch = useCallback(
        Debounce((value) => {
            const pattern = /^[a-zA-Z\s]*$/;
            if (pattern.test(value)) {
                setSearchError("");
                setSearchTerm(value);
            } else {
                setSearchError("Only alphabetic characters are allowed");
            }
        }, 500),
        []
    );

    const handleStudentSelect = async (rollNumber) => {
        try {
            const result = await trigger({ rollNumber }).unwrap()
            setSelectedStudent(result?.data);
        } catch (error) {
            console.log('error while fetching', error)
        }
    };

    return (
        <div className="container">
            <h1>Search Students</h1>
            <CustomSelect
                name={"search"}
                control={control}
                options={studentList}
                onChange={handleStudentSelect}
                handleSeacrh={debouncedSearch}
                placeholder='Search And Select A Student To View Detail'
                open={searchTerm?.length >= 3}
                value={searchTerm}
                notFoundContent={searchTerm?.length >= 3 ? "No Data Found" : null}
                customError={searchError}
            />
            {error?.data?.message}
            {selectedStudent && (
                <div>
                    <StudentCard selectedStudent={selectedStudent} />
                </div>
            )
            }
            {isLoading && <Spin size="large" />}
        </div >
    );
};

export default Students;
