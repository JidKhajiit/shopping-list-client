import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'reactstrap';
import './index.scss';
import '../../app.scss';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from 'react-router-dom';
import CreatingForm from '../CreatingForm';
import TasksList from '../helpers/TasksList';
import { MySpinner } from '../smallComponents/Spinner';
import { getGroupReq } from '../../redux/actions/groupActionCreator';
import { setEditingTaskId } from '../../redux/actions/tasksActionCreator';

export default props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [slideUp, setSlideUp] = useState('');
    const [isShowForm, setIsShowForm] = useState(false);
    const { openedGroup: currentGroup } = useSelector(state => state.groups);
    const { groupId } = props;

    useEffect(() => {
        dispatch(setEditingTaskId());
        dispatch(getGroupReq(groupId));
    }, []);

    const startAnimation = () => {
        if (!slideUp) setSlideUp('slideUp');
        setIsShowForm(!isShowForm);
    }

    const handleBackButton = () => {
        history.push('/groups');
    }


    return (
        currentGroup && currentGroup._id === groupId ? <div className="content-width">
            <div className="group-header flex-space-between">
                <h1>Group</h1>
                <Button onClick={handleBackButton} className="back-button"><KeyboardBackspaceIcon />Back</Button>
            </div>
            <Card body className="card__custom group__info purple-theme_back">
                <div className="card_item__custom">
                    <h5>{currentGroup.title}</h5>
                    <span className="card-item-article">group title</span>
                </div>
                <div className="flex-space-between">
                    <div className="left-item">
                        <div className="card_item__custom">
                            <p >{currentGroup.description}</p>
                            <span className="card-item-article">description</span>
                        </div>
                        <div className="task-tags card_item__custom">
                            {currentGroup.tags.join(' ')}
                            <span className="card-item-article">tags</span>
                        </div>
                    </div>
                    <div className="right-item card_item__custom">
                        {currentGroup.users.map((user) => <div key={user._id}>{user.nickName}</div>)}
                        <span className="card-item-article">users</span>
                    </div>
                </div>
            </Card>
            <div className={`tasks-area slider-element content-width ${isShowForm ? 'slideDown' : slideUp}`}>
                <CreatingForm slider={startAnimation} task groupId={groupId} users={currentGroup.users} />
                <div className='items-list'>

                    <div className='reverse'>
                        <span className='background__text'>Tasks</span>
                        <TasksList tasks={currentGroup.tasks} users={currentGroup.users} />
                    </div>
                </div>

                <div className="active-tasks card_item__custom">
                    <span className="card-item-article">active tasks </span>
                    {currentGroup.tasks.filter((task) => task.completed === false).length} of {currentGroup.tasks.length}
                </div>
            </div>

        </div> : <MySpinner fullSize />
    )
}