import React from "react";

export default function TodoCard(props: any) {
  const {
    children,
    edit,
    handleAddEdit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleEditTodo,
    handleDelete,
  } = props;

  return (
    <div className='p-2 relative sm:p-3 border flex items-stretch border-white border-solid '>
      <div className='flex-1 flex'>
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            className='bg-inherit flex-1 text-white outline-none'
            value={edittedValue}
            onChange={(e) => setEdittedValue(e.target.value)}
          />
        )}
      </div>
      <div className='flex items-center'>
        {edit === todoKey ? <p>CHECK</p> : <p>PENCIL</p>}
        <p>TRASH</p>
      </div>
    </div>
  );
}
