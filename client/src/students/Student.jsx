import { Spin } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import {
    useSearchStudentQuery,
    useLazyGetStudentQuery,
} from "../store/students/studentApiSlice";
import StudentCard from "../components/StudentCard";
import Debounce from "../utils/Debounce";
import CustomSelect from "../components/select";
import { useForm } from "react-hook-form";
import highlightText from "../utils/HighLightText";

const limit = 5;
const offset = 1;

const Students = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const { control } = useForm();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [searchError, setSearchError] = useState("");
    const [studentList, setStudentList] = useState([]);

    const [trigger] = useLazyGetStudentQuery();
    const { data: studentData, isLoading, error, isSuccess } = useSearchStudentQuery(
        { search: debouncedSearchTerm, limit, offset },
        { skip: debouncedSearchTerm?.length < 3 }
    );


    const debouncedSearch = useCallback(
        Debounce((value) => setDebouncedSearchTerm(value), 500),
        []
    );


    useEffect(() => {
        if (isSuccess) {
            if (debouncedSearchTerm?.length < 3) {
                setStudentList([]);
            } else if (debouncedSearchTerm) {
                setStudentList(
                    studentData?.data.map((data) => ({
                        label: highlightText(data.name, debouncedSearchTerm),
                        value: data.rollNumber,
                        key: data.name,
                    }))
                );
            }
        }
    }, [debouncedSearchTerm, studentData, isSuccess]);

    const handleInputChange = (value) => {
        const pattern = /^[a-zA-Z\s]*$/;
        if (pattern.test(value)) {
            setSearchError("");
            setSearchTerm(value);
            debouncedSearch(value); // Debounced API call l
        } else {
            setSearchError("Only alphabetic characters are allowed");
        }
    };

    const handleStudentSelect = async (rollNumber) => {
        try {
            const result = await trigger({ rollNumber }).unwrap();
            setSelectedStudent(result?.data);
            setSearchTerm(result?.data?.name);
        } catch (error) {
            console.log("error while fetching", error);
        }
    };

    return (
        <div className="container">
            <h1>Search Students</h1>
            <CustomSelect
                name={"search"}
                control={control}
                value={searchTerm}
                options={studentList}
                onSelect={handleStudentSelect}
                handleSearch={handleInputChange}
                placeholder="Search And Select A Student To View Detail"
                notFoundContent={searchTerm?.length >= 3 ? "No Data Found" : null}
            />
            {error?.data?.message || <span style={{ color: "red" }}>{searchError}</span>}
            {selectedStudent && (
                <div>
                    <StudentCard selectedStudent={selectedStudent} />
                </div>
            )}
            {isLoading && <Spin size="large" />}
        </div>
    );
};

export default Students;
