
interface Employee {
    id: number;
    FirstName: string;
    LastName: string;
    Age?: number;
    Address?: string;
    IDEmployee: number;
    Gender: string;
  }
  
export const employees: Employee[] = [

    {
      id: 0,
      FirstName: "Stella",
      LastName: "Reed",
      Age: 37,
      Address: "Byalik str, Apt. 26, Holon",
      IDEmployee: 47658955,
      Gender: "female"
    },
  
    {
      id: 1,
      FirstName: "Ran",
      LastName: "Shwizer",
      Age: 42,
      Address: "Shenkar str, Apt. 33, Bat Yam",
      IDEmployee: 45581366,
      Gender: "male"
    },
  
    {
      id: 2,
      FirstName: "Kim",
      LastName: "Besinger",
      Age: 55,
      Address: "Golan str, Apt. 66, Tel-Aviv",
      IDEmployee: 66456962,
      Gender: "female"
    },
  
    {
      id: 3,
      FirstName: "Shnulik",
      LastName: "Pesker",
      Age: 39,
      Address: "Sokolov str, Apt. 45, Ramat Gan",
      IDEmployee: 45581366,
      Gender: "male"
    },
  
    {
      id: 4,
      FirstName: "Tali",
      LastName: "Mozes",
      Age: 61,
      Address: "Arlozorov str, Apt. 4, Raanana",
      IDEmployee: 66456962,
      Gender: "female"
    },
  
    {
      id: 5,
      FirstName: "Sharon",
      LastName: "Amitzur",
      Age: 48,
      Address: "Hankin str, Apt. 88, Rishon Lezion",
      IDEmployee: 45581366,
      Gender: "male"
    }
  ];