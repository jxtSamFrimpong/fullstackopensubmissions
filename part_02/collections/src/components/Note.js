const Note = ({ content, importance, handler, id_num }) => {
    console.log('key is', id_num);
    return (
        <li className="Note_list">{content}
            <input type="checkbox" checked={importance} onChange={(event) => { handler(event, id_num, content, importance) }} />
        </li>
    )
}

export default Note