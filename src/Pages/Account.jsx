/* eslint-disable react/prop-types */
import { useLoaderData } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AccountPrice from "./AccountPrice";

const Account = ({orders}) => {
  const {_id} = orders || {}
  
  const accountData = useLoaderData()
  return (
    <div className="mb-36">
      <Tabs>
        <TabList>
          <Tab>Total sell</Tab>
          <Tab>Total ammaount: </Tab>
        </TabList>

        <TabPanel>
          <h2>{accountData.length}</h2>
        </TabPanel>
        <TabPanel>
         <AccountPrice></AccountPrice>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Account;
