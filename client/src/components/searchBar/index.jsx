import React from 'react'
import { Input } from 'antd'

function SearchBar({ handleSearchChange, handleFocus }) {
    return (
        <Input
            placeholder="Search students"
            onChange={handleSearchChange}
            onFocus={handleFocus}
            allowClear
            autoFocus
        />
    )
}

export default SearchBar