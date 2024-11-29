import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ProductComponent } from './product/product.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { RowComponent } from './components/row/row.component';
import { ColumnComponent } from './components/column/column.component';
import { SpaceComponent } from './components/space/space.component';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AddChemicalComponent } from './chemical/add-chemical/add-chemical.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { ChemicalComponent } from './chemical/chemical.component';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ContactComponent } from './contact/contact.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CapitalizePipe } from './shared/capitalize.pipe';
import { TooltipDirective } from './shared/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    ProductComponent,
    RowComponent,
    ColumnComponent,
    SpaceComponent,
    AddProductComponent,
    AddChemicalComponent,
    ChemicalComponent,
    ProductDetailComponent,
    ContactComponent,
    CapitalizePipe,
    TooltipDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    CardModule,
    ChipsModule,
    AutoCompleteModule,
    MultiSelectModule,
    DropdownModule,
    DynamicDialogModule,
    FieldsetModule,
    DividerModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextareaModule,
  ],
  providers: [DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
