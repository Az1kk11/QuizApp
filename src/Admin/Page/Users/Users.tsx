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
                <span>Id</span>
                <span>Atı</span>
                <span>Nátiyjeleri</span>
                <div className="res-table">
                    <table>
                        <tbody>
                            {users?.map(item => (
                                <tr>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <td>{item.results}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}