import QuoteForm from './../components/quotes/QuoteForm'
import { useHistory } from 'react-router';
import useHttp from './../hooks/use-http'
import { addQuote } from '../lib/api';
import { useEffect } from 'react';

const NewQuotes = () =>{

  const{sendRequest , status}=useHttp(addQuote , false);

  const history = useHistory();

  useEffect(() => {
    if(status==='completed')
    history.push('/quotes');
  }, [history , status])

    const addHandler=(props)=>{
        sendRequest(props);
    }
  return  <>
    <QuoteForm isLoading={status==='pending'?true:false} onAddQuote={addHandler}/>
  </>
};
export default NewQuotes;