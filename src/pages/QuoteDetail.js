import { useParams  ,Route ,Switch, Link } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from './../components/quotes/HighlightedQuote'
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react/cjs/react.development";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useRouteMatch } from "react-router";

const QuoteDetail = () =>{
    const params=useParams().quoteId;
    const match=useRouteMatch();
    
    const {sendRequest , status , data:quote , error} = useHttp(getSingleQuote , true);

    useEffect(()=>{
        sendRequest(params);
    },[sendRequest,params]);

    if(status==='pending')
    {
        return <LoadingSpinner />
    }
    else if(error!==null)
    {
        return <div className='centered'>{error}</div>
    }    
    if(!quote.author&&!quote.text)
    return <h2 style={{textAlign:'center'}}>No Quotes found...</h2>
    console.log(quote.author);
    
    return (
        <div>
        <HighlightedQuote text={quote.text} author={quote.author} />
        <Route path={match.path} exact>
            <div>
        <Link className='btn--flat' to={`${match.url}/comments`} > 
        Load Comments 
        </Link>
        </div>
        </Route>
    <Route path={`${match.path}/comments`} >
        <Comments />
    </Route>
    </div>
    )

};
export default QuoteDetail;