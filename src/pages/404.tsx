import { history } from '@umijs/max';
import { Button, Result } from 'antd';

export default () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => history.push('/')}>
            Back Home
          </Button>
        }
      />
    </>
  );
};
