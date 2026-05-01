import { useState, useEffect } from 'react';

function ContactList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/contacts');
                const result = await response.json();
                setData(result.records);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <ul>
            {data.map(item => (
                <li key={item.Id}>
                    {item.Name + ' ' + item.Title}
                </li>
            ))}
        </ul>
    )
}

export default ContactList;