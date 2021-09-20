import { useState , useCallback } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params=useParams();
  const{quoteId}=params;
  const {sendRequest , status , data:loadedComments} = useHttp(getAllComments);

  useEffect(()=>{
    sendRequest(quoteId);
  },[sendRequest , quoteId]);

  let Comments;
  const addCommentHandler = useCallback(()=> {
    sendRequest(quoteId)
  },[sendRequest , quoteId]);

  if(status==='pending')
  {
    Comments=<div><LoadingSpinner /></div>
  }
   if(status==='completed' && loadedComments )
  {
    Comments=<CommentsList comments={loadedComments} />;
    // console.log(loadedComments);
  }
   if (status==='completed' && !loadedComments  )
  {
    Comments=<div className='centered'>No Comments added.</div>
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment &&
       <NewCommentForm  
       quoteId={quoteId} 
       onAddComment={addCommentHandler}
       />}
      {Comments}
    </section>
  );
};

export default Comments;
