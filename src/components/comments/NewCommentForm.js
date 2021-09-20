import { useRef } from 'react';
import { useEffect } from 'react/cjs/react.development';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const{sendRequest , status , error} = useHttp(addComment);
  const{onAddComment}=props;
  useEffect(()=>{
    if(status==='completed'&& !error)
    {
      onAddComment();
    }
  },[status , error , onAddComment]);;

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    

    sendRequest({quoteId:props.quoteId , commentData:commentTextRef.current.value});
    commentTextRef.current.value='';
    
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {(status==='pending'&& <LoadingSpinner />)
     }
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
