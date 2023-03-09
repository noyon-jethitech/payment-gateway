



function updateTime(user_id, consume_time, remaining_time) {
    let consume_time_calculated = consume_time;
    let remaining_time_calculated = remaining_time;


    setInterval(() => {
        consume_time_calculated = consume_time + 1;
        remaining_time_calculated = remaining_time - 1;
    }, 1000)

    return { consume_time_calculated, remaining_time_calculated };

}