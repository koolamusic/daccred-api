# IAM

Within the Authentication service we define policies according to the user roles to derive these grants.


## Usage in other services
In other services apart from the `auth` service, we define our policies according to resources
and not according to roles. A quick example would be below. 


```js
const subscriberRoleToEmployeeResourceRule = [
    {
        action: 'update',
        subject: "EmployeeAPI",
        conditions: { subscriberId: '{{ subscriber_id }}', role: "subscriber, invitedBy: '{{ user_id }}' },
    },
];

```
Here we defined the rule to be attached to a role, however to be able to consume this rule on a service or resource, the rule definition will be resource specific with the ability to cater to respective roles, example below:


```js
const employeeResourcePermissionRule = [
    {
        action: 'update',
        subject: 'EmployeeAPI,
        conditions: { subscriberId: '{{ subscriber_id }}', role: { "$in": ['subscriber', 'employee'] }},
    },
    {
        action: 'update',
        subject: 'EmployeeAPI,
        conditions: {invitedBy: '{{ user_id }}' },
    },
];

```

See how here the rules can accomodate both an employee and subscriber who owns the employee, by grouping similar conditions, we can evaluate for each case. The equivalent can syntax will look something like 


```js

  can('update', 'EmployeeAPI', {subscriberId: subscriber_id,  role: { "$in": ['subscriber', 'employee'] } });

```