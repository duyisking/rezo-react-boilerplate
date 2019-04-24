import {
    ACTION,
} from '../action';

const metadata = (
    state = {
        title: '',
        description: '',
        keywords: '',
        canonical: '',
    },
    action,
) => {
    switch (action.type) {
        case ACTION.CHANGE_TITLE:
            return {
                ...state,
                title: action.title,
            };
        default:
            return state;
    }
};

export default metadata;
