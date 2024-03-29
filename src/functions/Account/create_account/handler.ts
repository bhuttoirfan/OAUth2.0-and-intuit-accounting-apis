import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
// import { oauth_client } from '@libs/oauth';
import axios from 'axios';

const create_account: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    
    const realmId = event.body.realmId;
    const token = event.body.accesstoken;
    const Name = event.body.Name;
    const AccountType = event.body.AccountType;
    
    const body = {
      Name,
      AccountType
    }
    
    // const response = await oauth_client.makeApiCall({
    //   url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/account?minorversion=63`,
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   },
    //   body
    // });

    const response = await axios.post(`https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/account?minorversion=63`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );

    return formatJSONResponse({
      message: response.data
    });
  }catch(err) {
    return formatJSONResponse({
      error: err
    });
  }
}

export const main = middyfy(create_account);