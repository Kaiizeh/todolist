export enum STATUS {
    pending ,
    completed,
    waiting
}


const data = {
    todolists : [
        {
            title: 'Groceries',
            items: [
                { title: 'Milk', completed: STATUS.pending },
                { title: 'Eggs', completed: STATUS.completed },
                { title: 'Bread', completed: STATUS.pending },
            ]
        },
        {
            title: 'Chores',
            items: [
                {title: 'Take out the trash', completed: STATUS.pending},
                {title: 'Clean the bathroom', completed: STATUS.pending},
                {title: 'Cook dinner', completed: STATUS.waiting},
            ]
        },
        {
            title: 'Work',
            items: [
                {title: 'Prepare presentation', completed: STATUS.pending},
                {title: 'Attend meeting', completed: STATUS.pending},
                {title: 'Submit report', completed: STATUS.pending},
            ]
        },

    ]
}

export default data;