function MediaSortFacotry(sortType) {
    const SortType ={
        date:"DATE",
        title:"TITLE",
        like:"LIKE"
    }

    let compare = (p1, p2) => {
        if (p1 > p2) {
            return 1
        }
        if (p1 < p2) {
            return -1
        }
        return 0
    }

    let sort = (m1,m2)=> compare(m1,m2)
    if(sortType === SortType.date){

      sort =  compare(new Date(m1.date), new Date(m2.date))
    }

    if(sortType === SortType.title){

        sort =  compare(m1.title, m2.title)
    }


    if(sortType === SortType.like){
        
        sort = compare(m1.likes, m2.likes)
    }


    return {SortType ,sort}



}
