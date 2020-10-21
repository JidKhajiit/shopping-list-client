import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardTitle } from 'reactstrap';

import { getGroupsReq } from '../../redux/actions/groupActionCreator';
import './index.scss';
import '../../app.scss';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import { useHistory } from 'react-router-dom';
import { getUsersReq } from '../../redux/actions/usersActionCreator';
import ListItemCard from '../helpers/ListItemCard';
import EditForm from '../helpers/EditForm';
// import { getFriendsReq } from '../../providers/friendsProvider';
import { Search } from '@material-ui/icons';

export default props => {
    const dispatch = useDispatch();
    const { groups: groupsArr, editingGroupId, editingGroupUsers } = useSelector(state => state.groups);
    // const [myFriends, setMyFriends] = useState([]);
    const history = useHistory();

    const handleGroupClick = (event, id) => {
        if (event.target.type !== "button") {
            history.push(`/groups/${id}`);
        }
    }

    // const getFriends = async () => {
    //     const response = await getFriendsReq();
    //     setMyFriends(response)
    // }

    useEffect(() => {
        dispatch(getGroupsReq());
        // getFriends();
        dispatch(getUsersReq());
    }, []);

    const groupsRender = groupsArr.map((group) => {
        if (group._id === editingGroupId && editingGroupUsers.length) {
            return <EditForm group={group}  key={group._id}/>
        } else {

            const activeTasksCounter = group.tasks.all ?
                `${group.tasks.active} of ${group.tasks.all}` :
                'no tasks yet';

            return (
                <ListItemCard className="groups-card" id={group._id} key={group._id} type="group" onClick={(event) => handleGroupClick(event, group._id)}>
                    <CardTitle className="flex-space-between">
                        <div className="group-title card_item__custom">
                            {group.title}
                            <span className="card-item-article">group title</span>
                        </div>
                        <div className="group-tags card_item__custom">
                            {group.tags.join(' ')}
                            <span className="card-item-article">tags</span>
                        </div>
                        <div className="users card_item__custom">
                            <AccessibleForwardIcon />
                            <span>{group.users.length}</span>
                            <span className="card-item-article">users</span>
                        </div>
                    </CardTitle>
                    <div className="group-description flex-space-between">
                        <div className="description card_item__custom">
                            {group.description}
                            <span className="card-item-article">description</span>
                        </div>
                        <div className="active-tasks card_item__custom">
                            <span className="card-item-article">active tasks</span>
                            {activeTasksCounter}
                        </div>

                    </div>

                </ListItemCard>
            )
        }
    })

    return (
        <div className="content-width">
            <div className="group-header flex-space-between">
                <h1>Tasks</h1>
                {/* <Button className="add-button"><AddIcon />New Group</Button> */}
            </div>
            <Search />Tags
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                {groupsRender}
            </div>

        </div>
    )
}