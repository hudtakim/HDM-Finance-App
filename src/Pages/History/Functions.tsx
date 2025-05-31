  export function FormatRupiah(value: number | string): string {
    const number = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(number)) return "Rp0,00";

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
    }).format(number);
}

type RowObject = {
[key: string]: string | number;
};

export function ConvertToObjects(data: (string | number)[][]): RowObject[] {
    const [headers, ...rows] = data;

    return rows.map((row) => {
        const obj: RowObject = {};
        headers.forEach((header, index) => {
        obj[header] = row[index];
        });
        return obj;
    });
}

export const GetTotal = (data:any) => {
    let total = 0;
    data.forEach((row:any) => total+= row['Jumlah']);
    return total;
}

type FilterOptions = {
  startDate?: string; // ISO date string
  endDate?: string;   // ISO date string
  user?: string;
  kategori?: string;
};

export function FilterRecords(
  data: RowObject[],
  options: FilterOptions
): RowObject[] {
  return data.filter((item) => {
    const time = new Date(item.Timestamp).getTime();
    const startDate = options.startDate ? new Date(options.startDate) : new Date();
    const endDate = options.endDate ? new Date(options.endDate) : new Date();
    startDate.setHours(-1,0,0,0);
    endDate.setHours(24,0,0,0);
    const start = options.startDate ? startDate.getTime(): -Infinity;
    const end = options.endDate ? endDate.getTime() : Infinity;
    const userMatch = options.user ? item.User === options.user : true;
    const kategoriMatch = options.kategori ? item.Kategori === options.kategori : true;

    return time >= start && time <= end && userMatch && kategoriMatch;
  });
}

export function GetDefaultDateRange(): { startDate: string; endDate: string } {
  const now = new Date();

  const start = new Date(now.getFullYear(), now.getMonth(), 2);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const toDateString = (date: Date): string => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };
  
  return {
    startDate: toDateString(start),
    endDate: toDateString(end),
  }
}

export function GetDropdownList(data: RowObject[]): any{
  const userList: (string | number)[] = [];
  const kategoriList: (string | number)[] = [];
    
  data.forEach(row => {
    if(!userList.includes(row.User)) userList.push(row.User);
    if(!kategoriList.includes(row.Kategori)) kategoriList.push(row.Kategori);
  });

  return {userList, kategoriList};
}

export function GetDataForBarChart(data: RowObject[]): any{
  const timestampList = data.map(row => FormatDateAxis(new Date(row.Timestamp))); //data.map(row => FormatDateAxis(new Date(row.Timestamp)));
  const jumlahList = data.map(row => {
    return {name: row.Kategori + ' - ' + row.Keterangan, value: row.Jumlah, itemStyle: { color: row.User === 'Huda' ? '#5470c6' : '#db4bca' }}
  });
  return {timestampList, jumlahList};
}

function FormatDateAxis(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12; // 0 jam = 12 pagi

  const hoursStr = hours.toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hoursStr}:${minutes} ${ampm}`;
}