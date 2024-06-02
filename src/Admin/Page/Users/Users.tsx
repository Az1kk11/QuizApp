import React, { useEffect, useState } from 'react'
import AuthUserServices from '../../../Redux/services'
import { usersState } from '../../type'

import './style.css'

export const Users: React.FC = () => {
    const [users, setUsers] = useState<usersState[]>([])

    const getUsers = async () => {
        try {
            const res = await AuthUserServices.users()
            setUsers(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { getUsers() }, [])

    return (
        <div className='users'>
            <div className="user-content">
                <h3>Paydalanıwshılar</h3>
                <div className="res-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Atı</th>
                                <th>Nátiyjeleri</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map(item => (
                                <tr>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>{item.results}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}