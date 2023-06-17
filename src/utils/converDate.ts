export function convertDate(data: string) {
  // data: 28/02/2023
  const dataArray = data.split('/')
  // dataArray = [28,02,2023]
  return new Date(dataArray[1] + '/' + dataArray[0] + '/' + dataArray[2])
}