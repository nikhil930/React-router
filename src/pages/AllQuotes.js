import QuoteList from './../components/quotes/QuoteList'
import useHttp from './../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import { useEffect } from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';
const AllQuotes = () =>{
    const{sendRequest , status ,  data:LoadedQuotes , error } = useHttp(getAllQuotes , true);

    useEffect(()=>{
        sendRequest();
    },[sendRequest])
    if(status==='pending')
    {
        return <LoadingSpinner />
    }
    if(status==='completed' && error===null && LoadedQuotes.length!=0)
    {
        return <QuoteList quotes={LoadedQuotes} />
    }
    else if(error!==null)
    {
        return <div className='centered'>{error}</div>
    }
    else{
        return <div className='centerd focussed'>No Quotes Found</div>
    }
    
};
export default AllQuotes;