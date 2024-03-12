import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-5">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">No of Student</CardTitle>
          </CardHeader>
          <CardContent>
            <p>800+</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">No of Mentor </CardTitle>
          </CardHeader>
          <CardContent>
            <p>100+</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
