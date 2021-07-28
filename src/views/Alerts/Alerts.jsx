import React, { useState, useEffect } from "react";
import "./Alerts.scss";
import { Tabs, Space, Input, Select, Button } from "antd";
import { genres } from "../../service/data";
import Notify from "../../components/Notifycomp/Notify";
import { toast } from "react-toastify";
import { userserviceurl } from "../../service/url";
import axios from "axios";
import Preloader from "../../components/Preloader/Preloader";

function Alerts() {
  const { TabPane } = Tabs;
  const { Search } = Input;
  const { Option } = Select;

  let userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const [alertDetail, setAlertDetail] = useState();
  const [loading, setLoading] = useState(false);

  const onSearch = () => {
    console.log("On search function");
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const fetchData = async () => {
    console.log("getting");
    setLoading(true);
    await axios
      .get(`${userserviceurl}/${userDetail?.id}`)
      .then((res) => {
        setLoading(false);
        setAlertDetail(res.data.alertDetails);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.dark("Incorrect Credentials");
        }
      });
  };

  const deleteallFilters = async (type) => {
    setLoading(true);
    let filterid = type === "people" ? alertDetail[0]?.id : alertDetail[1]?.id;
    console.log(alertDetail[0]);
    await axios
      .delete(`${userserviceurl}/delete/filters/${filterid}/${userDetail?.id}`)
      .then((response) => {
      setLoading(false);
        console.log(response);
        fetchData();
        toast.dark("Removed Successfully");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.dark("Error in Deletion");
        }
      });
  };

  const deleteIndividualFilter = async (filterid,choiceid) => {
    await axios
      .delete(`${userserviceurl}/delete/filters/choice/${userDetail?.id}/${filterid}/${choiceid}`)
      .then((response) => {
        fetchData();
        console.log(response);
        toast.dark("Filters Cleared Successfully");
      })
      .catch((err) => {
        if (err.response) {
          toast.dark("Error in Deletion");
        }
      });
  };

  const saveFilters = async () => {
    setLoading(true);
    console.log("Saving....", alertDetail);
    await axios
      .post(`${userserviceurl}/save/filters/${userDetail?.id}`, {
        alertDetails: alertDetail,
      })
      .then((res) => {
        setLoading(false);
        //setAlertDetail(res.data);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.dark("Incorrect Credentials");
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="alertPage">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div className=" card card-nav alert_navbar p-3">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Person" key="1">
                <Space direction="vertical">
                  <Search
                    placeholder="Enter the Actor Name"
                    allowClear
                    enterButton="Submit"
                    size="large"
                    onSearch={onSearch}
                    className="fil-elements"
                  />
                  <Button type="danger" className="m-2" onClick={()=>{deleteallFilters("people")}}>
                    Clear All
                  </Button>
                </Space>
              </TabPane>
              <TabPane tab="Genre" key="2">
                <Select
                  style={{ width: "100%" }}
                  defaultValue={genres[0].name}
                  onChange={handleChange}
                  className="fil-elements"
                >
                  {genres.map((data, ind) => (
                    <Option key={ind} disabled={ind === 0} value={data.name}>
                      {data.name}
                    </Option>
                  ))}
                </Select>
                <br />
                <Button type="primary" className="m-2">
                  Submit
                </Button>
                <Button type="danger" className="m-2" onClick={()=>{deleteallFilters("geners")}}>
                  Clear All 
                </Button>
              </TabPane>
            </Tabs>
          </div>
          <div className="card-alert">
            {alertDetail
              ? alertDetail?.map((details, ind) => {  
                return details?.choices?.map((data,index)=><Notify key={ind+index} typeId={details.id} deleteIndividualFilter={deleteIndividualFilter} title={data} />)
              })
              : "No Records found "}
          </div>
          <div>
            <Button type="danger" className="m-2" onClick={saveFilters}>
              Save FIlters
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Alerts;
