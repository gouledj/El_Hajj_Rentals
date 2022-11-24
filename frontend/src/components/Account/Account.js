import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";


import { CUSTOMER_API_URL } from "../../constants";

const About = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get(CUSTOMER_API_URL)
        .then((response) => {
           setCustomers(response.data);
        })
        .catch(console.log("error or loading"))
    }, []);

    console.log(customers[0]);
    
   const res = axios.put(CUSTOMER_API_URL + '1/', {
        firstName: "Joey",
        lastName: "Badass",
        driversLicense: "asdfasdf",
        email: "asdf@live.ca",
        salt: "asdfasdf",
        customerPhone: "1587654",
        dob: "2019-10-11",
        goldMember: true,
        province: "AB",
        city: "Edmonton",
        postalCode: "T4N 3H3",
        streetNumber: 5015,
        streetName: "cool street",
        unitNumber: 1
    })

    const delete2 = () => {
        axios.delete(CUSTOMER_API_URL + '2/');
        console.log("delete successful");
    }

    return (
        <div className="userDetails">
            <div className="detailsHeader">
              <h1>USER DETAILS</h1>
            </div>
            {
                customers?.length > 0
                ? (
                    <div>
                        <p>{customers[0].firstName}</p>
                        <p>{customers[0].lastName}</p>
                        <p>{customers[0].driversLicense}</p>
                        <p>{customers[0].email}</p>
                        <p>{customers[0].customerPhone}</p>
                        <p>{customers[0].dob}</p>
                        <p>{customers[0].goldMember}</p>
                        <p>{customers[0].province}</p>
                        <p>{customers[0].city}</p>
                        <p>{customers[0].postalCode}</p>
                        <p>{customers[0].streetNumber}</p>
                        <p>{customers[0].streetName}</p>
                        <p>{customers[0].unitNumber}</p>
                    </div>
                ) : (
                    <p>firstName</p>
                )
            }
            <button class="delete" onClick={delete2}>Delete entry 2</button>
        </div>
    );
}

export default About;