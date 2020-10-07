import {
    SET_GROUPS,
    GET_GROUPS_REQ,
    GET_GROUP_REQ,
    SET_OPENED_GROUP,
    RESET_OPENED_GROUP,
    SET_EDITING_GROUP_ID
} from '../types';


export const setGroups = (payload) => {
    return {
        type: SET_GROUPS,
        payload
    }
}

export const setOpenedGroup = (payload) => {
    return {
        type: SET_OPENED_GROUP,
        payload
    }
}

export const getGroupsReq = () => {
    return { type: GET_GROUPS_REQ }
}

export const getGroupReq = (payload) => {
    return {
        type: GET_GROUP_REQ,
        payload
    }
}

export const setEditingGroupId = (payload) => ({
    type: SET_EDITING_GROUP_ID,
    payload: payload || null
})