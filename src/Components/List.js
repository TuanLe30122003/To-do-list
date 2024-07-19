import React, { useMemo } from 'react'
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useThemeContext } from '../context/themeContexts';

function List({ name, completed, id, removeTodo, grid, handleCompleted }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const theme = useThemeContext();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    // random color

    const randomColors = [
        theme.buttonGradient1,
        theme.buttonGradient2,
        theme.buttonGradient3,
        theme.buttonGradient4,
        theme.buttonGradient5,
        theme.buttonGradient6,
        theme.buttonGradient7,
        theme.buttonGradient8,
        theme.buttonGradient9,
        theme.buttonGradient10,
        theme.buttonGradient11,
        theme.buttonGradient12,
        theme.buttonGradient13,
        theme.buttonGradient14,
    ]

    // randomize color

    const randomizeColor = () => {
        const randomColorIndex = randomColors[Math.floor(Math.random() * randomColors.length)];

        return randomColorIndex;
    };

    // useMemo to prevent rerendering

    const randomColorMemo = useMemo(() => {
        return randomizeColor();
    }, [])

    const checkIcon = <i className="fa-solid fa-circle-check"></i>

    return (
        <ListStyled theme={theme} grid={grid} completed={completed} colors={randomColorMemo} style={style} {...attributes} {...listeners} ref={setNodeRef}>
            <li
                onDoubleClick={() => removeTodo(id)}
            ><p>{name}</p></li>
            <div className='complete-btn' onDoubleClick={() => handleCompleted(id)}>
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
        margin-bottom: ${props => props.grid ? '1rem' : '1rem'};
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
        top: ${(props) => props.grid ? '40%' : '50%'};
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
