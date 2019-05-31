const ACTION = {
    CHANGE_TITLE: 'CHANGE_TITLE',
};

const changeTitle = title => ({
    title,
    type: ACTION.CHANGE_TITLE,
});

export {
    ACTION,
    changeTitle,
};
