import Filter from '../../ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      field='last'
      options={[
        { value: '7', text: 'Last 7 days' },
        { value: '30', text: 'Last 30 days' },
        { value: '90', text: 'Last 90 days' },
      ]}
    />
  );
}

export default DashboardFilter;
