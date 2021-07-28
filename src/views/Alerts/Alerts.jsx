import React, { useState, useEffect } from "react";
import "./Alerts.scss";
import { Tabs, Space, Input, Select, Button } from "antd";
import { genres } from "../../service/data";
import Notify from "../../components/Notifycomp/Notify";
import { toast } from "react-toastify";
import { userserviceurl } from "../../service/url";
import axios from "axios";
import UUID from "uuid-int";
import Preloader from "../../components/Preloader/Preloader";

function Alerts() {
  // number  0 <= id <=511
  const id = 2;

  const generator = UUID(id);

  const { TabPane } = Tabs;
  const { Search } = Input;
  const { Option } = Select;

  const sampleData = [
    {
      type: "person",
      choices: [],
    },
    {
      type: "geners",
      choices: [],
    },
  ];

  let userDetail = JSON.parse(localStorage.getItem("userDetails"));

  const [alertDetail, setAlertDetail] = useState(sampleData);
  const [selectValue, setSelectValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSelect = (value, type) => {
    if (value) {
      let data = [...alertDetail];
      let unId = String(generator.uuid());
      if (type === "person") {
        if (data[0]) {
          data[0].choices = [
            ...data[0].choices,
            {
              id: Number(unId.substring(unId.length - 4)),
              name: value,
            },
          ];
        } else {
          data[0] = {
            type: "person",
            choices: [
              {
                id: Number(unId.substring(unId.length - 4)),
                name: value,
              },
            ],
          };
        }
      } else {
        if (data[1]) {
          data[1].choices = [...data[1].choices, value];
        } else {
          data[1] = {
            type: "geners",
            choices: [value],
          };
        }
      }
      setAlertDetail([...data]);
    }
  };

  const handleChange = (value) => {
    setSelectValue(genres.filter((gener) => gener.id === value)[0]);
  };

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(`${userserviceurl}/${userDetail?.id}`)
      .then((res) => {
        setLoading(false);
        setAlertDetail(
          res?.data?.alertDetails?.length ? res.data.alertDetails : sampleData
        );
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
    let filterid = alertDetail?.filter((data) => data?.type === type)[0]?.id;
    await axios
      .delete(`${userserviceurl}/delete/filters/${filterid}/${userDetail?.id}`)
      .then((response) => {
        setLoading(false);
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

  const deleteIndividualFilter = async (filterid, choiceid) => {
    await axios
      .delete(
        `${userserviceurl}/delete/filters/choice/${userDetail?.id}/${filterid}/${choiceid}`
      )
      .then((response) => {
        fetchData();
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
    await axios
      .post(
        `${userserviceurl}/save/filters/${userDetail?.id}`,
        {
          alertDetails: alertDetail,
        },
        {
          headers: {
            Authorization: userDetail.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        fetchData();
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
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="alertPage">
          <div className=" card card-nav alert_navbar p-3">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Person" key="1">
                <Space direction="vertical">
                  <Search
                    placeholder="Enter the Actor Name"
                    allowClear
                    enterButton="Submit"
                    size="large"
                    onSearch={(value) => onSelect(value, "person")}
                    className="fil-elements"
                  />
                  <Button
                    type="danger"
                    className="m-2"
                    onClick={() => {
                      deleteallFilters("person");
                    }}
                  >
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
                    <Option key={ind} disabled={ind === 0} value={data.id}>
                      {data.name}
                    </Option>
                  ))}
                </Select>
                <br />
                <Button
                  onClick={() => {
                    onSelect(selectValue, "gener");
                  }}
                  type="primary"
                  className="m-2"
                >
                  Submit
                </Button>
                <Button
                  type="danger"
                  className="m-2"
                  onClick={() => {
                    deleteallFilters("geners");
                  }}
                >
                  Clear All
                </Button>
              </TabPane>
            </Tabs>
          </div>
          <div className="wholeCard">
            <div className="card-alert">
              {alertDetail[0]?.choices?.length ? (
                alertDetail?.map((details, ind) => {
                  return details?.choices?.map((data, index) => (
                    <Notify
                      key={ind + index}
                      typeId={details.id}
                      deleteIndividualFilter={deleteIndividualFilter}
                      title={data}
                    />
                  ));
                })
              ) : (
                <p className="h5">No Records Found</p>
              )}
            </div>
            {alertDetail[0]?.choices?.length && (
              <div className="finalsave">
                <Button type="danger" className="m-2" onClick={saveFilters}>
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Alerts;
