import React from 'react'
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useThemeContext } from '../context/themeContexts';

function List({ name, completed, id, removeTodo }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const theme = useThemeContext();

    const checkIcon = <i className="fa-solid fa-circle-check"></i>

    return (
        <ListStyled theme={theme} style={style} {...attributes} {...listeners} ref={setNodeRef}>
            <li
                onDoubleClick={() => removeTodo(id)}
            >{name}</li>
            <div className='complete-btn'>
                {checkIcon}
            </div>
        </ListStyled>
    )
}

const ListStyled = styled.div`
    background: ${(props) => props.theme.colorBg2};
    position: relative;
    li{
        background: ${(props) => props.colors};
        padding: 1rem 2rem;
        border-radius: 5px;
        margin-bottom: ${props => props.grid ? '1rem' : '0'};
        list-style: none;
        border: 1px solid ${props => props.theme.colorIcons3};
        box-shadow:${props => props.theme.shadow4};
        &:hover{
            cursor: pointer;
        }
        &:active{
            transform: scale(0.98);
        }
        p{
            font-size: clamp(1rem, 2vw, 1.2rem);
            color: ${(props) => props.completed ? props.theme.colorPrimaryGreen : props.theme.colorGrey0};
            text-decoration: ${props => props.completed ? 'line-through' : 'none'}; 
        }
    }

    .complete-btn{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: clamp(1.2rem, 2vw, 2rem);
        padding: .4rem .9rem;
        font-family: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        color: ${props => props.completed ? props.theme.colorPrimaryGreen : props.theme.colorIcons2};
        i{
            border-radius: 50%;
            box-shadow: 1px 3px 7px rgba(0,0,0,0.3);
        }
    }
`;

export default List
