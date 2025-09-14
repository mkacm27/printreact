import React from 'react';
import { Calendar as RNCalendar, CalendarProps as RNCalendarProps } from 'react-native-calendars';
import { styled } from 'nativewind';

const StyledCalendar = styled(RNCalendar);

export type CalendarProps = RNCalendarProps;

function Calendar({ ...props }: CalendarProps) {
  return (
    <StyledCalendar
      theme={{
        backgroundColor: 'hsl(210 20% 98%)',
        calendarBackground: 'hsl(210 20% 98%)',
        textSectionTitleColor: 'hsl(215 10% 50%)',
        selectedDayBackgroundColor: 'hsl(200 95% 45%)',
        selectedDayTextColor: 'hsl(0 0% 100%)',
        todayTextColor: 'hsl(200 95% 45%)',
        dayTextColor: 'hsl(215 25% 26%)',
        textDisabledColor: 'hsl(215 10% 50%)',
        dotColor: 'hsl(200 95% 45%)',
        selectedDotColor: 'hsl(0 0% 100%)',
        arrowColor: 'hsl(200 95% 45%)',
        monthTextColor: 'hsl(215 25% 26%)',
        indicatorColor: 'blue',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
